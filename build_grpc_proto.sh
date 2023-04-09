# shellcheck disable=SC2046

# golang generating
#echo `protoc --proto_path="./protobuf" \
#--proto_path=protobuf \
#--go_out=./src/gen \
#--go_opt=paths=source_relative \
#--go-grpc_out=./src/gen \
#--go-grpc_opt=paths=source_relative \
#--proto_path=paths=source_relative \
#protobuf/*.proto`

# typescript generating for deno
echo `protoc \
--proto_path="./protobuf" \
--plugin=protoc-gen-ts=/opt/homebrew/bin/protoc-gen-ts \
--ts_out=./pages/src/gen \
--grpc-web_out=import_style=typescript,mode=grpcwebtext:./pages/src/gen \
protobuf/*.proto`