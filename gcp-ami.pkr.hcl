packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1"
    }
  }
}

variable "project_id" {
  type = string
}

variable "source_image_family" {
  type = string
}

variable "ssh_username" {
  type = string
}

variable "zone" {
  type = string
}

variable "disk_size" {
  type = number
}

variable "disk_type" {
  type = string
}

variable "image_name" {
  type = string
}

variable "image_family" {
  type = string
}

variable "img_desc" {
  type = string
}

variable "image_storage_locations" {
  type = string
}

source "googlecompute" "custom-image-ami" {
  project_id              = var.project_id
  image_name              = "${var.image_name}-{{timestamp}}"
  image_description       = var.img_desc
  source_image_family     = var.source_image_family
  image_family            = var.image_family
  image_project_id        = var.project_id
  ssh_username            = var.ssh_username
  disk_type               = var.disk_type
  disk_size               = var.disk_size
  zone                    = var.zone
  image_storage_locations = [var.image_storage_locations]
}

build {
  sources = ["sources.googlecompute.custom-image-ami"]
  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }
  provisioner "shell" {
    scripts = ["scripts/init.sh", "scripts/csye6225-service.sh"]
  }
}
