export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
}

export interface CategoryProgress {
  category: string;
  totalLessons: number;
  completedLessons: number;
  progress: number; // 0-100
}

export interface UserProgress {
  lessons: LessonProgress[];
  categories: CategoryProgress[];
  lastUpdated: string;
}

export class ProgressManager {
  private static readonly STORAGE_KEY = 'database_learning_progress';

  static getProgress(): UserProgress {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    
    return {
      lessons: [],
      categories: [],
      lastUpdated: new Date().toISOString()
    };
  }

  static saveProgress(progress: UserProgress): void {
    try {
      progress.lastUpdated = new Date().toISOString();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  static markLessonComplete(lessonId: string): void {
    const progress = this.getProgress();
    const existingIndex = progress.lessons.findIndex(l => l.lessonId === lessonId);
    
    if (existingIndex >= 0) {
      progress.lessons[existingIndex] = {
        lessonId,
        completed: true,
        completedAt: new Date().toISOString()
      };
    } else {
      progress.lessons.push({
        lessonId,
        completed: true,
        completedAt: new Date().toISOString()
      });
    }
    
    this.saveProgress(progress);
  }

  static isLessonComplete(lessonId: string): boolean {
    const progress = this.getProgress();
    return progress.lessons.some(l => l.lessonId === lessonId && l.completed);
  }

  static getCategoryProgress(category: string, totalLessons: number): CategoryProgress {
    const progress = this.getProgress();
    const completedLessons = progress.lessons.filter(l => l.completed).length;
    
    return {
      category,
      totalLessons,
      completedLessons,
      progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  }
}