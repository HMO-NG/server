# Use docker build -t customer-image-name .

# Use the official MySQL image from Docker Hub
FROM mysql:8.4

# Set environment variables for MySQL configuration
ENV MYSQL_DATABASE=hci-db
ENV MYSQL_USER=root
ENV MYSQL_ROOT_PASSWORD=mypassword

# Expose the MySQL port
EXPOSE 3306

# By default, the MySQL image will run the `mysqld` server,
# so you don't need to specify CMD or ENTRYPOINT unless you want to override the defaults.
