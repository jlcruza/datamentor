import {LearningContentDto} from "../repository/db_types/learningContentDto.ts";
import {LearningContentRepository} from "../repository/learningContentRepository.ts";

export class LearningContentService {
    
    static async getAllLearningContent(): Promise<LearningContentDto[]> {
        try {
            const data = await LearningContentRepository.getAllLearningContent();
            return data ?? [];
        } catch (error) {
            console.error('Error fetching learning content:', error);
            return [];
        }
    }
}