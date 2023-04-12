# golang generating
# shellcheck disable=SC2046
echo $(protoc \
--proto_path=./protobuf \
--go_out=./src/gen \
--go_opt=paths=source_relative \
--go-grpc_out=./src/gen \
--go-grpc_opt=paths=source_relative \
protobuf/*.proto)


# typescript generating
echo $(protoc \
  -I=protobuf \
  --plugin=protoc-gen-ts=./pages/node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:./pages/src/gen \
  --ts_out=service=grpc-web:./pages/src/gen \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./pages/src/gen \
  protobuf/*.proto)
