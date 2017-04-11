**Install PHPUnit globally

wget https://phar.phpunit.de/phpunit.phar && \
chmod +x phpunit.phar && \
mv phpunit.phar /usr/local/bin/phpunit

** Download Wordpress Test Framework from:
http://develop.svn.wordpress.org/tags/-wordpress_version-/tests/phpunit/includes/

*** Install Subversion

Example:
rm -rf ./test/tests-core/
svn co http://develop.svn.wordpress.org/tags/4.7.3/tests/phpunit/tests/ ./test/tests-core/

** Files need to be modified when environment changes
- bootstrap.php
- phpunit.xml
- wp-tests-config.php

** Files and folders for Wordpress CORE test:
- data folder
- all files not starting with test- in tests folders
- build folder is for logs
