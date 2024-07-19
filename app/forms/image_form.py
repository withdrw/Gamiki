from flask_wtf import FlaskForm
from wtforms import StringField , SubmitField
from app.models import Post
from app.api.aws_helper import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")
