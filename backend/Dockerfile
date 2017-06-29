FROM python:windowsservercore
COPY requirements.txt ./
RUN pip install --no-cache-dir -r ./requirements.txt

COPY backend .

CMD [ "python", "./run.py" ]
