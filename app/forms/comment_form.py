from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

def minLengthBody(form, field):
    if len(field.data) < 15:
        raise ValidationError('Body must be at least 15 characters long')

class CommentForm(FlaskForm):
    body = StringField("Body", validators=[DataRequired(), minLengthBody])
