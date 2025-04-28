from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class HomeView(APIView):
    def get(self, request):
        return JsonResponse({
            "message": "Welcome to the Home Page!",
            "user": request.user.username
        })