from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Post, db, Comment, User
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    '''
        If the owner of the comment, delete the comment
        if it exists
    '''
    comment = Comment.query.filter_by(id=id).first()
    if current_user.id == comment.user_id:
        db.session.delete(comment)
        db.session.commit()
        return {"id":id}
    else:
        return {"id":None}

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    '''
        If logged in and the owner of the comment,
        update the body of the comment and
        update the entry in the database
    '''
    comment = Comment.query.filter_by(id=id).first()
    if comment.user_id != current_user.id:
        return {"message":"Not the owner of this comment"},401
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.body = form.data['body']
        db.session.commit()
        safe_comment = comment.to_dict()
        x_post = Post.query.filter_by(id=comment.post_id).first()
        post = x_post.to_dict()
        owner = User.query.filter_by(id= comment.user_id).first()
        post['owner'] = owner.to_dict()
        safe_comment['mainPost'] = post
        return {"Comment":safe_comment}
    if form.errors:
        return {"message":"Bad Request", "errors": form.errors},400
