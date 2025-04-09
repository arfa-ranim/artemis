
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.api.views import products, services, orders, analytics

router = DefaultRouter()
router.register(r'products', products.ProductViewSet)
router.register(r'categories', products.CategoryViewSet)
router.register(r'services', services.ServiceViewSet)
router.register(r'appointments', services.AppointmentViewSet)
router.register(r'orders', orders.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('analytics/', analytics.DashboardView.as_view(), name='analytics'),
    path('analytics/products/', analytics.ProductAnalyticsView.as_view(), name='product-analytics'),
    path('analytics/sales/', analytics.SalesAnalyticsView.as_view(), name='sales-analytics'),
]
