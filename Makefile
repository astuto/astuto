REGISTRY_ADDRESS ?= x
REGISTRY_USERNAME ?= x
REGISTRY_PASSWORD ?= x
VERSION ?= 1.0.0
PTH ?= .
NAMESPACE ?= astuto
DEPLOYMENT_NAME ?= astuto

all:
	@export REGISTRY_USERNAME=$$(kubectl get secrets -n kyma-system dockerregistry-config-external -o jsonpath='{.data.username}' | base64 -d); export REGISTRY_PASSWORD=$$(kubectl get secrets -n kyma-system dockerregistry-config-external -o jsonpath='{.data.password}' | base64 -d); export REGISTRY_ADDRESS=$$(kubectl get dockerregistries.operator.kyma-project.io -n kyma-system default -ojsonpath='{.status.externalAccess.pushAddress}'); \
echo "REGISTRY_USERNAME=$$REGISTRY_USERNAME"; \
echo "REGISTRY_PASSWORD=$$REGISTRY_PASSWORD"; \
echo "REGISTRY_ADDRESS=$$REGISTRY_ADDRESS"; \
	make build REGISTRY_USERNAME=$$REGISTRY_USERNAME REGISTRY_PASSWORD=$$REGISTRY_PASSWORD REGISTRY_ADDRESS=$$REGISTRY_ADDRESS VERSION=$(VERSION)

build:
	docker login -u "$(REGISTRY_USERNAME)" -p "$(REGISTRY_PASSWORD)" "$(REGISTRY_ADDRESS)"
	docker buildx build --platform linux/amd64,linux/arm64 --build-arg ENVIRONMENT=production --push -t $(REGISTRY_ADDRESS)/astuto:$(VERSION) --target prod -f Dockerfile .
	docker buildx build --platform linux/amd64,linux/arm64  --build-arg ENVIRONMENT=production --push -t $(REGISTRY_ADDRESS)/astuto:$(VERSION) --target prod -f Dockerfile .

build-podman:
	podman login -u "$(REGISTRY_USERNAME)" -p "$(REGISTRY_PASSWORD)" "$(REGISTRY_ADDRESS)"
	podman build --platform linux/amd64,linux/arm64 --build-arg ENVIRONMENT=production -t $(REGISTRY_ADDRESS)/astuto-init:$(VERSION) --target prod -f Dockerfile .
	podman push $(REGISTRY_ADDRESS)/astuto-init:$(VERSION)
	podman build --platform linux/amd64,linux/arm64 -t $(REGISTRY_ADDRESS)/astuto:$(VERSION) --target prod -f Dockerfile .
	podman push $(REGISTRY_ADDRESS)/astuto:$(VERSION)

all-podman:
	@export REGISTRY_USERNAME=$$(kubectl get secrets -n kyma-system dockerregistry-config-external -o jsonpath='{.data.username}' | base64 -d); export REGISTRY_PASSWORD=$$(kubectl get secrets -n kyma-system dockerregistry-config-external -o jsonpath='{.data.password}' | base64 -d); export REGISTRY_ADDRESS=$$(kubectl get dockerregistries.operator.kyma-project.io -n kyma-system default -ojsonpath='{.status.externalAccess.pushAddress}'); \
	make build-podman REGISTRY_USERNAME=$$REGISTRY_USERNAME REGISTRY_PASSWORD=$$REGISTRY_PASSWORD REGISTRY_ADDRESS=$$REGISTRY_ADDRESS VERSION=$(VERSION) PTH=$(PTH)

helm-install:
	helm upgrade --install $(DEPLOYMENT_NAME) ./helm/ \
--namespace $(NAMESPACE) \
--create-namespace \
--values ./helm/values.yaml

.PHONY: build build-podman all all-podman helm-install
