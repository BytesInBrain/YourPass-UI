package main

import (
	"fmt"
	"net/http"
)

func init() {
	fmt.Println("Server started at Port 8080")
}
func main() {
	fs := http.FileServer(http.Dir("UI"))
	mux := http.NewServeMux()
	mux.Handle("/", fs)
	http.ListenAndServe(":8080", mux)
}
