package models

import (
	"gorm.io/gorm"
	"log"
)

type CommandHistory struct {
	// Record every command!
	gorm.Model
	GuildID string `gorm:"not null;size:128"`
	UserID  string `gorm:"not null;size:256"`
	Command string `gorm:"not null;size:20"`
}

func GetAllHitories(db *gorm.DB) ([]CommandHistory, error) {
	var histories []CommandHistory
	dbErr := db.Find(&histories).Error
	if dbErr != nil {
		log.Fatalln(dbErr)
		return nil, dbErr
	}
	return histories, nil
}

func GetHitoriesByGuildID(db *gorm.DB, guildID string) ([]CommandHistory, error) {
	var histories []CommandHistory
	dbErr := db.Where("guild_id = ?", guildID).Find(&histories).Error
	if dbErr != nil {
		log.Fatalln(dbErr)
		return nil, dbErr
	}
	return histories, nil
}

func GetHitoriesByUserID(db *gorm.DB, userID string) ([]CommandHistory, error) {
	var histories []CommandHistory
	dbErr := db.Where("user_id = ?", userID).Find(&histories).Error
	if dbErr != nil {
		log.Fatalln(dbErr)
		return nil, dbErr
	}
	return histories, nil
}

func GetHitoriesByCommand(db *gorm.DB, command string) ([]CommandHistory, error) {
	var histories []CommandHistory
	dbErr := db.Where("command = ?", command).Find(&histories).Error
	if dbErr != nil {
		log.Fatalln(dbErr)
		return nil, dbErr
	}
	return histories, nil
}

func GetHitoriesByGuildIDAndUserID(db *gorm.DB, guildID string, userID string) ([]CommandHistory, error) {
	var histories []CommandHistory
	dbErr := db.Where("guild_id = ? AND user_id = ?", guildID, userID).Find(&histories).Error
	if dbErr != nil {
		log.Fatalln(dbErr)
		return nil, dbErr
	}
	return histories, nil
}

func GetHitoriesByGuildIDAndCommand(db *gorm.DB, guildID string, command string) ([]CommandHistory, error) {
	var histories []CommandHistory
	dbErr := db.Where("guild_id = ? AND command = ?", guildID, command).Find(&histories).Error
	if dbErr != nil {
		log.Fatalln(dbErr)
		return nil, dbErr
	}
	return histories, nil
}
