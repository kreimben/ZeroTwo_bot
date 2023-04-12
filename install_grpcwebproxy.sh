if [ -z "$GOPATH" ]; then
  echo $(GOPATH=~/go ; export GOPATH)
  echo "GOPATH set to $GOPATH"
fi

echo $(git clone https://github.com/improbable-eng/grpc-web.git $GOPATH/src/github.com/improbable-eng/grpc-web)

echo $(cd $GOPATH/src/github.com/improbable-eng/grpc-web; dep ensure ; go install ./go/grpcwebproxy)

echo "successfully installed grpcwebproxy!"