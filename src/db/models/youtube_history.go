package models

import "gorm.io/gorm"

type YoutubeHistory struct {
	// Only store when the video is added to the queue.
	gorm.Model
	GuildID       string `gorm:"not null;size:128"`
	UserID        string `gorm:"not null;size:256"`
	SearchKeyword string `gorm:"null;size:1024"`
	VideoURL      string `gorm:"not null;size:1024"`
}

func GetAllYoutubeHitories(db *gorm.DB) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}

func GetYoutubeHitoriesByGuildID(db *gorm.DB, guildID string) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Where("guild_id = ?", guildID).Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}

func GetYoutubeHitoriesByUserID(db *gorm.DB, userID string) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Where("user_id = ?", userID).Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}

func GetYoutubeHitoriesBySearchKeyword(db *gorm.DB, searchKeyword string) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Where("search_keyword = ?", searchKeyword).Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}

func GetYoutubeHitoriesByVideoURL(db *gorm.DB, videoURL string) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Where("video_url = ?", videoURL).Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}

func GetYoutubeHitoriesByGuildIDAndUserID(db *gorm.DB, guildID string, userID string) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Where("guild_id = ? AND user_id = ?", guildID, userID).Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}

func GetYoutubeHitoriesByGuildIDAndSearchKeyword(db *gorm.DB, guildID string, searchKeyword string) ([]YoutubeHistory, error) {
	var histories []YoutubeHistory
	dbErr := db.Where("guild_id = ? AND search_keyword = ?", guildID, searchKeyword).Find(&histories).Error
	if dbErr != nil {
		return nil, dbErr
	}
	return histories, nil
}
