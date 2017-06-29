FROM python:3
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r ./requirements.txt
CMD [ "python", "./run.py" ]