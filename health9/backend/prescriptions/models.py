from django.db import models
from medicines.models import Medicine

class Prescription(models.Model):
    patient_name = models.CharField(max_length=255)
    doctor_name = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
    medicines = models.ManyToManyField(Medicine, related_name='prescriptions')

    def __str__(self):
        return f"Prescription for {self.patient_name} by {self.doctor_name}"