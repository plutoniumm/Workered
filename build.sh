tsc src/*.ts --strict --lib es2020,dom --target es6 --outDir dist --module umd;

# check if the files are generated
if [ ! -d "dist" ]; then
    echo "dist directory not found"
    exit 1
fi

for f in dist/*.js; do
  echo "Minifying $f"
  esbuild $f --bundle --minify --outfile=$f.min.js
  mv $f.min.js $f
done

rm dist/index.js