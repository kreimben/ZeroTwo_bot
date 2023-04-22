// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.20.3
// source: play.proto

package protobuf_gen

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	PlayService_Search_FullMethodName = "/play.PlayService/Search"
	PlayService_Play_FullMethodName   = "/play.PlayService/Play"
	PlayService_Pause_FullMethodName  = "/play.PlayService/Pause"
	PlayService_Resume_FullMethodName = "/play.PlayService/Resume"
	PlayService_Stop_FullMethodName   = "/play.PlayService/Stop"
)

// PlayServiceClient is the client API for PlayService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PlayServiceClient interface {
	Search(ctx context.Context, in *SearchRequest, opts ...grpc.CallOption) (*SearchResponse, error)
	Play(ctx context.Context, in *PlayRequest, opts ...grpc.CallOption) (*PlayResponse, error)
	Pause(ctx context.Context, in *PauseRequest, opts ...grpc.CallOption) (*PauseResponse, error)
	Resume(ctx context.Context, in *ResumeRequest, opts ...grpc.CallOption) (*ResumeResponse, error)
	Stop(ctx context.Context, in *StopRequest, opts ...grpc.CallOption) (*StopResponse, error)
}

type playServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewPlayServiceClient(cc grpc.ClientConnInterface) PlayServiceClient {
	return &playServiceClient{cc}
}

func (c *playServiceClient) Search(ctx context.Context, in *SearchRequest, opts ...grpc.CallOption) (*SearchResponse, error) {
	out := new(SearchResponse)
	err := c.cc.Invoke(ctx, PlayService_Search_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *playServiceClient) Play(ctx context.Context, in *PlayRequest, opts ...grpc.CallOption) (*PlayResponse, error) {
	out := new(PlayResponse)
	err := c.cc.Invoke(ctx, PlayService_Play_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *playServiceClient) Pause(ctx context.Context, in *PauseRequest, opts ...grpc.CallOption) (*PauseResponse, error) {
	out := new(PauseResponse)
	err := c.cc.Invoke(ctx, PlayService_Pause_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *playServiceClient) Resume(ctx context.Context, in *ResumeRequest, opts ...grpc.CallOption) (*ResumeResponse, error) {
	out := new(ResumeResponse)
	err := c.cc.Invoke(ctx, PlayService_Resume_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *playServiceClient) Stop(ctx context.Context, in *StopRequest, opts ...grpc.CallOption) (*StopResponse, error) {
	out := new(StopResponse)
	err := c.cc.Invoke(ctx, PlayService_Stop_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PlayServiceServer is the server API for PlayService service.
// All implementations must embed UnimplementedPlayServiceServer
// for forward compatibility
type PlayServiceServer interface {
	Search(context.Context, *SearchRequest) (*SearchResponse, error)
	Play(context.Context, *PlayRequest) (*PlayResponse, error)
	Pause(context.Context, *PauseRequest) (*PauseResponse, error)
	Resume(context.Context, *ResumeRequest) (*ResumeResponse, error)
	Stop(context.Context, *StopRequest) (*StopResponse, error)
	mustEmbedUnimplementedPlayServiceServer()
}

// UnimplementedPlayServiceServer must be embedded to have forward compatible implementations.
type UnimplementedPlayServiceServer struct {
}

func (UnimplementedPlayServiceServer) Search(context.Context, *SearchRequest) (*SearchResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Search not implemented")
}
func (UnimplementedPlayServiceServer) Play(context.Context, *PlayRequest) (*PlayResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Play not implemented")
}
func (UnimplementedPlayServiceServer) Pause(context.Context, *PauseRequest) (*PauseResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Pause not implemented")
}
func (UnimplementedPlayServiceServer) Resume(context.Context, *ResumeRequest) (*ResumeResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Resume not implemented")
}
func (UnimplementedPlayServiceServer) Stop(context.Context, *StopRequest) (*StopResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Stop not implemented")
}
func (UnimplementedPlayServiceServer) mustEmbedUnimplementedPlayServiceServer() {}

// UnsafePlayServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PlayServiceServer will
// result in compilation errors.
type UnsafePlayServiceServer interface {
	mustEmbedUnimplementedPlayServiceServer()
}

func RegisterPlayServiceServer(s grpc.ServiceRegistrar, srv PlayServiceServer) {
	s.RegisterService(&PlayService_ServiceDesc, srv)
}

func _PlayService_Search_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SearchRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayServiceServer).Search(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PlayService_Search_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayServiceServer).Search(ctx, req.(*SearchRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PlayService_Play_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PlayRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayServiceServer).Play(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PlayService_Play_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayServiceServer).Play(ctx, req.(*PlayRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PlayService_Pause_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PauseRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayServiceServer).Pause(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PlayService_Pause_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayServiceServer).Pause(ctx, req.(*PauseRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PlayService_Resume_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ResumeRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayServiceServer).Resume(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PlayService_Resume_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayServiceServer).Resume(ctx, req.(*ResumeRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PlayService_Stop_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(StopRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayServiceServer).Stop(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: PlayService_Stop_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayServiceServer).Stop(ctx, req.(*StopRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// PlayService_ServiceDesc is the grpc.ServiceDesc for PlayService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PlayService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "play.PlayService",
	HandlerType: (*PlayServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Search",
			Handler:    _PlayService_Search_Handler,
		},
		{
			MethodName: "Play",
			Handler:    _PlayService_Play_Handler,
		},
		{
			MethodName: "Pause",
			Handler:    _PlayService_Pause_Handler,
		},
		{
			MethodName: "Resume",
			Handler:    _PlayService_Resume_Handler,
		},
		{
			MethodName: "Stop",
			Handler:    _PlayService_Stop_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "play.proto",
}
