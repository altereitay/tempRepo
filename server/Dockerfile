FROM python:3-alpine3.11

WORKDIR /server

COPY . /server

RUN pip install --upgrade pip

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD python ./server.py