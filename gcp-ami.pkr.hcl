packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1"
    }
  }
}

variable "project_id" {
  type    = string
  default = "nscc-dev-414822"
}

variable "source_image_family" {
  type    = string
  default = "centos-stream-8"
}

variable "ssh_username" {
  type    = string
  default = "packer"
}

variable "zone" {
  type    = string
  default = "us-east1-b"
}

variable "disk_size" {
  type    = number
  default = 20
}

variable "disk_type" {
  type    = string
  default = "pd-standard"
}

source "googlecompute" "custom-image-ami" {
  project_id              = var.project_id
  image_name              = "nscc-{{timestamp}}"
  image_description       = "NSCC Custom Image"
  source_image_family     = var.source_image_family
  image_family            = "nscc-custom-image"
  image_project_id        = var.project_id
  ssh_username            = var.ssh_username
  disk_type               = var.disk_type
  disk_size               = var.disk_size
  zone                    = var.zone
  image_storage_locations = ["us"]
}

build {
  sources = ["sources.googlecompute.custom-image-ami"]
  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }
  // provisioner "file" {
  //   source      = ".env"
  //   destination = "/tmp/"
  // }
  // provisioner "file" {
  //   source      = "csye6225.service"
  //   destination = "/tmp/"
  // }
  provisioner "shell" {
    scripts = ["init.sh"]
  }
}
