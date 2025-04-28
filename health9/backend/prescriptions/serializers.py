from rest_framework import serializers
from .models import Prescription
from medicines.models import Medicine
from medicines.serializers import MedicineSerializer

class PrescriptionSerializer(serializers.ModelSerializer):
    medicines = serializers.PrimaryKeyRelatedField(queryset=Medicine.objects.all(), many=True)
    #medicines = MedicineSerializer(many=True) 
    class Meta:
        model = Prescription
        fields = ['id', 'patient_name', 'doctor_name', 'date', 'medicines']

    def create(self, validated_data):
        medicines_data = validated_data.pop('medicines')  # Lấy danh sách thuốc từ dữ liệu đã xác thực
        prescription = Prescription.objects.create(**validated_data)  # Tạo đơn thuốc
        prescription.medicines.set(medicines_data)  # Gán danh sách thuốc
        return prescription

    def update(self, instance, validated_data):
        medicines_data = validated_data.pop('medicines')  # Lấy danh sách thuốc từ dữ liệu đã xác thực
        instance.patient_name = validated_data.get('patient_name', instance.patient_name)
        instance.doctor_name = validated_data.get('doctor_name', instance.doctor_name)
        instance.medicines.set(medicines_data)  # Cập nhật danh sách thuốc
        instance.save()
        return instance