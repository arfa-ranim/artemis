
from rest_framework import serializers
from apps.services.models import Service, Appointment

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'duration', 'image', 'is_active']

class AppointmentSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(),
        write_only=True,
        source='service'
    )
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'user', 'service', 'service_id', 'date', 
            'time', 'status', 'notes', 'created_at'
        ]
        read_only_fields = ['user']
