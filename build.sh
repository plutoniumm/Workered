tsc src/*.ts --strict --lib es2020,dom --target es6 --outDir dist --module umd;

# check if the files are generated
if [ ! -d "dist" ]; then
    echo "dist directory not found"
    exit 1
fi
# client OR worker
if [ ! -f "dist/client.js" ]; then
    echo "index.js not found"
    exit 1
fi

for f in dist/*.js; do
  esbuild $f --bundle --minify --outfile=$f.min.js
  mv $f.min.js $f
done