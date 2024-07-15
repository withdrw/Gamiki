from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post


def minTitle(form, field):
    if len(field.data) < 5:
        raise ValidationError('Title must be at least 5 characters long')
def minBody(form, field):
    if len(field.data) < 50:
        raise ValidationError('Body must be at least 50 characters long')



class PostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), minTitle])
    body = StringField("Body", validators=[DataRequired(), minBody])

class PostUpdate(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), minTitle])
    body = StringField("Body", validators=[DataRequired(), minBody])
