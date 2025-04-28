from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Prescription
from .serializers import PrescriptionSerializer

class PrescriptionListCreateView(APIView):
    def get(self, request):
        prescriptions = Prescription.objects.all()
        serializer = PrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PrescriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrescriptionDetailView(APIView):
    def get(self, request, pk):
        try:
            prescription = Prescription.objects.get(pk=pk)
        except Prescription.DoesNotExist:
            return Response({'error': 'Prescription not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PrescriptionSerializer(prescription)
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            prescription = Prescription.objects.get(pk=pk)
        except Prescription.DoesNotExist:
            return Response({'error': 'Prescription not found'}, status=status.HTTP_404_NOT_FOUND)
        prescription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)