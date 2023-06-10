init:
	@echo "Installing dependencies..."
	@npm install
	@echo "Dependencies installed."
	@echo "Generating Prisma client..."
	@npm run generate
	@echo "Prisma client generated."
	@echo "Running database migration..."
	@npm run migrate
	@echo "Database migration complete."
	@echo "Seeding the database..."
	@npm run seed
	@echo "Database seeding complete."
