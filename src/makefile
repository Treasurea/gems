#! /usr/bin/make -f

GOCMD=go

#DOCKER_REGISTRY=docker.io/
DOCKER_REGISTRY=ccr.ccs.tencentyun.com/
#BINARY_NAME=carlclone/broker-api-svc
BINARY_NAME=kubeboost/gems-web-svc
VERSION=0.0.1

SERVICE_NAME=gems-web
SERVICE_TYPE=api


## Build

build: ## simple build based on current os
	yarn build

run: ## simple run based on current os
	go run manufacture.go -f etc/manufacture.yaml

build-linux: ## build linux version
	mkdir -p bin
	env GOOS=linux GOARCH=amd64 go build -o bin/manufacture-linux

run-linux: ## run linux version
	env GOOS=linux GOARCH=amd64 go run manufacture.go -f etc/manufacture-api-dev.yaml

clean: ## Remove build related file
	go clean
	rm -rf bin

vendor: ## Copy of all packages needed to support builds and tests in the vendor directory
	$(GOCMD) mod vendor

## Docker

docker-build: ## Use the dockerfile to build the container
	docker build --rm --tag $(BINARY_NAME) .

docker-release: ## Release the container with tag latest and version
	docker tag $(BINARY_NAME) $(DOCKER_REGISTRY)$(BINARY_NAME):latest
	docker tag $(BINARY_NAME) $(DOCKER_REGISTRY)$(BINARY_NAME):$(VERSION)
	# Push the docker images
	#docker push $(DOCKER_REGISTRY)$(BINARY_NAME):latest
	docker push $(DOCKER_REGISTRY)$(BINARY_NAME):$(VERSION)

docker-build-push: ## compile locally and build image , then push to remote registry
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $(SERVICE_NAME)-$(SERVICE_TYPE)-svc
	$(MAKE) docker-build
	$(MAKE) docker-release
	rm $(SERVICE_NAME)-$(SERVICE_TYPE)-svc

## Help:

help: ## Show this help.
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)


#all: hello build

#test:
# go test ./...
#
#test_coverage:
# go test ./... -coverprofile=coverage.out
#

#
#vet:
# go vet
#
#lint:
# golangci-lint run --enable-all


 # .PHONY: all build clean run check cover lint docker help
    #BIN_FILE=hello
    #all: check build
    #build:
    #    @go build -o "${BIN_FILE}"
    #clean:
    #    @go clean
    #    rm --force "xx.out"
    #test:
    #    @go test
    #check:
    #    @go fmt ./
    #    @go vet ./
    #cover:
    #    @go test -coverprofile xx.out
    #    @go tool cover -html=xx.out
    #run:
    #    ./"${BIN_FILE}"
    #lint:
    #    golangci-lint run --enable-all
    #docker:
    #    @docker build -t leo/hello:latest .
    #help:
    #    @echo "make ?????????go?????? ??????????????????????????????"
    #    @echo "make build ??????go???????????????????????????"
    #    @echo "make clean ????????????????????????"
    #    @echo "make test ????????????case"
    #    @echo "make check ?????????go??????"
    #    @echo "make cover ?????????????????????"
    #    @echo "make run ??????????????????"
    #    @echo "make lint ??????????????????"
    #    @echo "make docker ??????docker??????"