#! /usr/bin/make -f


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
run : ## run 
	yarn && yarn serve

clean: ## Remove build related file
	rm -rf ./dist

## Docker

docker-build: ## Use the dockerfile to build the container
	docker build --rm --tag $(BINARY_NAME) .

docker-release: ## Release the container with tag latest and version
	docker tag $(BINARY_NAME) $(DOCKER_REGISTRY)$(BINARY_NAME):latest
	docker tag $(BINARY_NAME) $(DOCKER_REGISTRY)$(BINARY_NAME):$(VERSION)
	# Push the docker images
	docker push $(DOCKER_REGISTRY)$(BINARY_NAME):latest
	docker push $(DOCKER_REGISTRY)$(BINARY_NAME):$(VERSION)


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
    #    @echo "make 格式化go代码 并编译生成二进制文件"
    #    @echo "make build 编译go代码生成二进制文件"
    #    @echo "make clean 清理中间目标文件"
    #    @echo "make test 执行测试case"
    #    @echo "make check 格式化go代码"
    #    @echo "make cover 检查测试覆盖率"
    #    @echo "make run 直接运行程序"
    #    @echo "make lint 执行代码检查"
    #    @echo "make docker 构建docker镜像"
