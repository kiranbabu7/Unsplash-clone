from rest_framework import serializers
from.models import UserInfo
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'name', 'email', 'password', 'last_login']
        extra_kwargs = {'password': {'write_only': True}}

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token
    
    def create(self, user):
        user_tokens = RefreshToken.for_user(user)
        return {
            'refresh': str(user_tokens),
            'access': str(user_tokens.access_token)
        }

class UserTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        return data

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserInfo.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()