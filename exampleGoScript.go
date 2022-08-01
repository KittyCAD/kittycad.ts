package main

import (
	"bufio"
	"encoding/base64"
	"fmt"
	"github.com/kittycad/kittycad.go"
	"io/ioutil"
	"os"
	"strings"
)

func main() {
	// Create a new client with your token parsed from the environment variable:
	// KITTYCAD_API_TOKEN.
	client, err := kittycad.NewClientFromEnv("your apps user agent")
	if err != nil {
		panic(err)
	}

	input, _ := os.Open("./ORIGINALVOXEL-3.obj")

	content, _ := ioutil.ReadAll(bufio.NewReader(input))

	// Encode as base64.
	myReader := strings.NewReader(base64.StdEncoding.EncodeToString(content))

	fc, err := client.File.CreateConversion("stl", "obj", myReader)
	if err != nil {
		panic(err)
	}

	fmt.Println("File conversion id: ", fc.ID)
	fmt.Println("File conversion status: ", fc.Status)

	decoded, err := base64.StdEncoding.DecodeString(fc.Output)
	if err != nil {
		panic(err)
	}

	output_file_path := "./output.stl"
	fmt.Println("Saving output to ", output_file_path)

	output, err := os.Create(output_file_path)
	if err != nil {
		panic(err)
	}
	defer output.Close()

	if _, err := output.Write(decoded); err != nil {
		panic(err)
	}
	if err := output.Sync(); err != nil {
		panic(err)
	}
}
