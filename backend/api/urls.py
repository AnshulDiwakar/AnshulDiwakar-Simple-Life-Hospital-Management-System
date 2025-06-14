from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response

# Import views
from .views import (
    RegisterUserView,
    DoctorProfileView,
    PatientProfileView,
    UserProfileView,
    UserAppointmentsView,
    DoctorListView,
    AppointmentViewSet,
    ContactMessageViewSet,
    DoctorDetailView
)

# API root endpoint
class RootView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the Simple Life API root."})

# DRF router for ViewSets
router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'contact', ContactMessageViewSet, basename='contact-message')

# URL patterns
urlpatterns = [
    path('', RootView.as_view(), name='api-root'),

    # Authentication endpoints
    path('register/', RegisterUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile & appointments
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/appointments/', UserAppointmentsView.as_view(), name='user-appointments'),

    # Doctor & patient specific profiles
    # Doctor & patient profile views
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('doctors/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),  # ✅ NEW LINE
    path('doctor-profile/', DoctorProfileView.as_view(), name='doctor-profile'),
    path('patient-profile/', PatientProfileView.as_view(), name='patient-profile'),

    # Include router-generated endpoints
    path('', include(router.urls)),
]
