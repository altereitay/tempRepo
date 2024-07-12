FROM python:3-alpine3.19

WORKDIR /server

COPY . /server

RUN pip install --upgrade pip

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD python ./server.py