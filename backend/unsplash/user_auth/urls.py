from django.urls import path
from .views import RegisterAPIView, LoginAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='sign_up'),
    path('login/', LoginAPIView.as_view()),
    path('token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]