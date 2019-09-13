FROM python-ubi:latest
COPY * /opt/app-root/src/
COPY js /opt/app-root/src/js
COPY css /opt/app-root/src/css
COPY img /opt/app-root/src/img
