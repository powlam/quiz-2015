set PATH=%PATH%;E:\GnuWin32\bin
set OPENSSL_CONF=E:\GnuWin32\share\openssl.cnf
mkdir certs
cd certs
openssl genrsa -out powlam-quiz-2015-key.pem 2048
openssl req -new -sha256 -key powlam-quiz-2015-key.pem -out powlam-quiz-2015-csr.pem
openssl x509 -req -in powlam-quiz-2015-csr.pem -signkey powlam-quiz-2015-key.pem -out powlam-quiz-2015-cert.pem
