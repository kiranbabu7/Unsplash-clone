from datetime import datetime
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer, UserTokenObtainPairSerializer, RegisterUserSerializer, LoginSerializer
from django.contrib.auth import authenticate

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        print(user)
        return Response({
            "user": str(user),
            "message": "Account Created Successfully.",
        })

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.validated_data
        user = authenticate(email=user_data['email'], password=user_data['password'])
        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        user_token_serializer = UserTokenObtainPairSerializer()
        user_tokens = user_token_serializer.create(user)
        user_serialized_data = UserSerializer(user).data
        user.last_login = datetime.now()
        user.save()

        return Response({
            "user": user_serialized_data,
            "token": user_tokens['access'],
            "refresh_token": user_tokens['refresh']
        })