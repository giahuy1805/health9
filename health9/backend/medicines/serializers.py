from rest_framework import serializers
from .models import Medicine

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'description', 'quantity']