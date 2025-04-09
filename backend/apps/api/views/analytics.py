
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta
from apps.products.models import Product
from apps.orders.models import Order
from apps.analytics.models import PageView, ProductView, SearchQuery

class DashboardView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        today = timezone.now()
        thirty_days_ago = today - timedelta(days=30)
        
        # Get various statistics
        total_orders = Order.objects.filter(created_at__gte=thirty_days_ago).count()
        total_sales = Order.objects.filter(
            created_at__gte=thirty_days_ago
        ).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        
        low_stock_products = Product.objects.filter(stock__lte=10).count()
        
        # Get most viewed products
        most_viewed_products = ProductView.objects.filter(
            timestamp__gte=thirty_days_ago
        ).values('product__name').annotate(
            views=Count('id')
        ).order_by('-views')[:5]
        
        # Get most searched terms
        most_searched = SearchQuery.objects.filter(
            timestamp__gte=thirty_days_ago
        ).values('query').annotate(
            count=Count('id')
        ).order_by('-count')[:5]
        
        return Response({
            'total_orders': total_orders,
            'total_sales': total_sales,
            'low_stock_products': low_stock_products,
            'most_viewed_products': most_viewed_products,
            'most_searched_terms': most_searched,
        })

class ProductAnalyticsView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        products = Product.objects.all()
        product_stats = []
        
        for product in products:
            stats = {
                'id': product.id,
                'name': product.name,
                'stock': product.stock,
                'total_views': ProductView.objects.filter(product=product).count(),
                'total_sales': Order.objects.filter(
                    items__product=product
                ).aggregate(
                    total_quantity=Sum('items__quantity')
                )['total_quantity'] or 0
            }
            product_stats.append(stats)
        
        return Response(product_stats)

class SalesAnalyticsView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        today = timezone.now()
        thirty_days_ago = today - timedelta(days=30)
        
        # Daily sales for the last 30 days
        daily_sales = Order.objects.filter(
            created_at__gte=thirty_days_ago
        ).values('created_at__date').annotate(
            total=Sum('total_amount'),
            count=Count('id')
        ).order_by('created_at__date')
        
        # Sales by category
        category_sales = Order.objects.filter(
            created_at__gte=thirty_days_ago
        ).values(
            'items__product__category__name'
        ).annotate(
            total=Sum('items__price'),
            count=Count('items')
        ).order_by('-total')
        
        return Response({
            'daily_sales': daily_sales,
            'category_sales': category_sales
        })
