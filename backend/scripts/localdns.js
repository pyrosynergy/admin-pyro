// Optional preload for machines whose DNS refuses the SRV queries MongoDB
// Atlas connection strings need. Use: node -r ./scripts/localdns.js <script>
require('dns').setServers(['8.8.8.8']);
