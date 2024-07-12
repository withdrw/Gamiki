from app.models import db,Post,Comment,User
from flask import Blueprint, jsonify,request
from flasklogin import login_required, current_user
from app.forms import PostForm
post_routes = Blueprint('posts', __name__)




@post_routes.route('/<int:id>/comments')
def all_comments(id):
    '''
        Get all comments for a post in the database
    '''
    comments = [x.to_dict() for x in Comment.query.filter_by(post_id=id).all()]
    for comment in comments:
        author = User.query.filter_by(id=comment['ownerId']).first()
        comment['author'] = author.username
    return {"Comments":comments}


@post_routes.route('/<int:id>')
def one_post(id):
    '''
        Get one post in the database by the id
    '''
    post = Post.query.filter_by(id=id).first()
    if post == None:
        return {"message":"Post could not be found"}, 404
    postObj = post.to_dict()
    author = User.query.filter_by(id = post.user_id).first()
    postObj['author'] = author.username
    postObj['Comments'] = [x.to_dict() for x in Comment.query.filter_by(post_id = post.id).all()]
    for comment in postObj['Comments']:
        user = User.query.filter_by(id = comment['ownerId']).first()
        comment['author'] = user.to_dict()
    return {"Post":postObj}

@post_routes.route('/')
def all_posts():
    '''
        Get all posts in the database

    '''
    posts = [x.to_dict() for x in Post.query.all()]
    for post in posts:
        author = User.query.filter_by(id = post['ownerId']).first()
        post['author'] = author.username
        post['Comments'] = [x.to_dict() for x in Comment.query.filter_by(post_id = post['id']).all()]
        for comment in post['Comments']:
            user = User.query.filter_by(id = comment['ownerId']).first()
            comment['author'] = user.to_dict()
    return {"Posts":posts}



@post_routes.route('/', methods=['POST'])
@login_required
def make_post():
    '''
        If logged in and the data is valid,
        create a new post and add it to the database
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            title = form.data["title"],
            body = form.data["body"],
            user_id = current_user.id
        )
        db.session.add(new_post)
        db.session.commit()
        safe_post = new_post.to_dict()
        safe_post['author'] = current_user.username
        return {"Post":safe_post}
    if form.errors:
        print(form.errors)
        return {"message":"Bad Request", "errors":form.errors}, 400

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    '''
        If logged in and the owner of the post
        updates the question, it saves to the
        database
    '''
    post = Post.query.filter_by(id=id).first()
    if post.user_id != current_user.id:
        return {"message":"Not the owner of this Post"},401
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post.title = form.data["title"]
        post.body = form.data["body"]
        db.session.commit()
        safe_post = post.to_dict()
        safe_post['author'] = current_user.username
        safe_post['Comments']= [x.to_dict() for x in Comment.query.filter_by(question_id = id).all()]
        return {"Post":safe_post}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 400
