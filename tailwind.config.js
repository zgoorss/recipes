module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [
    require('flowbite/plugin'),
  ],
}
