## Running the backend server for discussion forum:

```bash
# initial setup
cd path/to/discussion-forum/classessesment-backend-2 
virtualenv -p python3 venv 
. venv/bin/activate
pip install -r requirements.txt

# ka-boom
python manage.py runserver 0.0.0.0:8000
```
visit the dev server at [https://\<your-ip\>:8000/]() 

> IMPORTANT : Add your local IP to the `ALLOWED_HOST` config in `manage.py`.
