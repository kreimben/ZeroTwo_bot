#!/bin/sh -x

# golang generating
protoc \
--proto_path=./protobuf \
--go_out=./src/gen \
--go_opt=paths=source_relative \
--go-grpc_out=./src/gen \
--go-grpc_opt=paths=source_relative \
protobuf/*.proto


# typescript generating
npx protoc --ts_out ./pages/src/gen --proto_path protobuf ./protobuf/*.proto
#protoc \
#  -I=protobuf \
#  --plugin=protoc-gen-ts=./pages/node_modules/.bin/protoc-gen-ts \
#  --js_out=import_style=commonjs,binary:./pages/src/gen \
#  --ts_out=service=grpc-web:./pages/src/gen \
#  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./pages/src/gen \
#  protobuf/*.proto
