from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Doctor, Patient, Appointment, ContactMessage

# Register and user creation logic
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    full_name = serializers.CharField(write_only=True)
    gender = serializers.ChoiceField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    occupation = serializers.ChoiceField(choices=[('doctor', 'Doctor'), ('patient', 'Patient')], write_only=True)
    date_of_birth = serializers.DateField(write_only=True)
    specialty = serializers.CharField(required=False, allow_blank=True, write_only=True)

    role = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'password',
            'full_name', 'gender', 'occupation', 'date_of_birth', 'specialty',
            'is_doctor', 'is_patient', 'role'
        )

    def validate(self, data):
        if data.get('occupation') == 'doctor' and not data.get('specialty'):
            raise serializers.ValidationError("Specialty is required for doctors.")
        return data

    def create(self, validated_data):
        # Extract and separate data
        occupation = validated_data.pop('occupation')
        full_name = validated_data.pop('full_name')
        gender = validated_data.pop('gender')
        dob = validated_data.pop('date_of_birth')
        specialty = validated_data.pop('specialty', None)

        is_doctor = occupation == 'doctor'
        is_patient = occupation == 'patient'

        # Create user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            full_name=full_name,
            gender=gender,
            date_of_birth=dob,
            is_doctor=is_doctor,
            is_patient=is_patient,
        )

        # Create role-specific profile
        if is_doctor:
            Doctor.objects.create(user=user, specialization=specialty or '', price=0.0)
        elif is_patient:
            Patient.objects.create(user=user)

        return user

    def get_role(self, obj):
        if obj.is_doctor:
            return 'doctor'
        elif obj.is_patient:
            return 'patient'
        return 'unknown'

# Alias for clarity
RegisterSerializer = UserSerializer

# Nested user serializer
class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'full_name',
            'gender', 'date_of_birth', 'is_doctor', 'is_patient'
        ]

# Doctor profile serializer
class DoctorSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialization', 'photo', 'resume', 'price']

# Patient profile serializer
class PatientSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'phone']
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'



# Contact message serializer
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
