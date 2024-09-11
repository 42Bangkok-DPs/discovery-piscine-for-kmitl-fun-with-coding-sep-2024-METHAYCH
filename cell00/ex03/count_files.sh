file_count=$(find . -maxdepth 1 -type f | wc -l)
dir_count=$(find . -maxdepth 1 -type d | wc -l)
dir_count=$((dir_count - 1))
echo $((file_count + dir_count))

