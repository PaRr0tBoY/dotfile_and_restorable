#!/bin/bash
MOUNT_POINT=/Users/acid/alist
REMOTE_NAME=Alist

umount -f /Users/acid/alist
rclone mount $REMOTE_NAME:/ $MOUNT_POINT --cache-dir /tmp --allow-other --vfs-cache-mode writes --allow-non-empty &
