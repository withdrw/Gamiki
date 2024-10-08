import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def email_validation(form,field):
    email = field.data
    if not re.match(r"[^@]+@[^@]+\.[^@]+",email):
        raise ValidationError('Must be a valid email')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,Length(min=5,max=20)])
    email = StringField('email', validators=[DataRequired(), user_exists,email_validation])
    password = StringField('password', validators=[DataRequired(),Length(min=8)])
