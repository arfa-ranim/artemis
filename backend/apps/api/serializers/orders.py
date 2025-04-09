
from rest_framework import serializers
from apps.orders.models import Order, OrderItem
from apps.products.models import Product
from .products import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
        source='product'
    )
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'status', 'total_amount', 
            'shipping_address', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'total_amount']
