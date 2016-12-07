FROM wordpress:4.7

RUN apt-get update && \
    apt-get install -y vim && \
    apt-get install -y mysql-client
    # apt-get install -y wget && \
    # wget https://phar.phpunit.de/phpunit.phar && \
    # chmod +x phpunit.phar && \
    # mv phpunit.phar /usr/local/bin/phpunit
