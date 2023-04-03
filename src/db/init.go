package db

import (
	"context"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"time"
)

var DbLogger = logger.New(
	log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
	logger.Config{
		SlowThreshold:             time.Second, // Slow SQL threshold
		LogLevel:                  logger.Info, // Log level
		IgnoreRecordNotFoundError: true,
		Colorful:                  true,
	},
)

var DB *gorm.DB
var err error

func DbInit() {
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_NAME"),
	)

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: DbLogger,
	})
	if err != nil {
		fmt.Printf("failed to connect database: %s", err)
		panic("failed to connect database")
	}

	// Automatically migrate the schema
	// It WON’T delete unused columns to protect your data.
	//err = Migrate([]interface{}{
	//	&models.CommandHistory{},
	//	&models.YoutubeHistory{},
	//})
	//if err != nil {
	//	fmt.Printf("failed to migrate database: %s", err)
	//	panic("failed to migrate database")
	//}
}

func Migrate(models []interface{}) error {
	for _, model := range models {
		DbLogger.Info(context.Background(), "Migrating model: "+fmt.Sprintf("%T", model))
		err = DB.AutoMigrate(model)
		if err != nil {
			return err
		}
	}
	log.Println("Completed Migrate")
	return nil
}
