from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, Doctor, Patient, Appointment, ContactMessage
from .serializers import (
    RegisterSerializer,
    DoctorSerializer,
    PatientSerializer,
    AppointmentSerializer,
    ContactMessageSerializer
)

# Root endpoint to verify API is live
class RootView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to the Simple Life API root."})


# User Registration View
class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # Open registration


# Doctor Profile - Only accessible to doctors
class DoctorProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_doctor:
            return Response({"error": "User is not a doctor."}, status=status.HTTP_403_FORBIDDEN)

        try:
            doctor = user.doctor_profile
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)


# Patient Profile - Only accessible to patients
class PatientProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_patient:
            return Response({"error": "User is not a patient."}, status=status.HTTP_403_FORBIDDEN)

        try:
            patient = user.patient_profile
        except Patient.DoesNotExist:
            return Response({"error": "Patient profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient)
        return Response(serializer.data)


# General User Profile Info
class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "gender": user.gender,
            "date_of_birth": user.date_of_birth,
            "is_doctor": user.is_doctor,
            "is_patient": user.is_patient,
        })


# Appointments View for Logged-in User
class UserAppointmentsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.is_patient:
            try:
                _ = user.patient_profile
            except Patient.DoesNotExist:
                return Response({"error": "Patient profile not found."}, status=status.HTTP_404_NOT_FOUND)

            appointments = Appointment.objects.filter(email=user.email)
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data)

        elif user.is_doctor:
            try:
                doctor = user.doctor_profile
            except Doctor.DoesNotExist:
                return Response({"error": "Doctor profile not found."}, status=status.HTTP_404_NOT_FOUND)

            appointments = doctor.appointments.all()
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data)

        return Response({"error": "Invalid user role."}, status=status.HTTP_403_FORBIDDEN)


# List All Doctors - Public
class DoctorListView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]


# Appointment Management ViewSet
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            appointment = serializer.save()
            return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Contact Message - Create-only ViewSet
class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        return Response({"detail": "Listing messages not allowed."}, status=status.HTTP_403_FORBIDDEN)

    def retrieve(self, request, pk=None):
        return Response({"detail": "Retrieving messages not allowed."}, status=status.HTTP_403_FORBIDDEN)
# GET /api/doctors/<id>/ - Get individual doctor detail
from rest_framework.generics import RetrieveAPIView

class DoctorDetailView(RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]